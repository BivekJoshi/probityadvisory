<?php
/*
 * Receives the website's enquiry form and emails it to the practice.
 *
 * It ships with the static site (everything in public/ is copied into
 * public_html), so it runs on the cPanel host's own PHP and mail server and
 * needs no third-party form service or API key. The form POSTs JSON and gets
 * JSON back: {"ok": true}, or {"ok": false, "error": "<reason>"}.
 *
 * Deliverability depends on DNS: the domain's SPF record must allow this host
 * to send, and DKIM should be on, or DMARC (p=quarantine) will bin the mail.
 */

declare(strict_types=1);

const RECIPIENT = 'info@probityadvisory.co.uk';
// Sent from our own domain so SPF, DKIM and DMARC line up; the visitor goes in Reply-To.
const SENDER = 'info@probityadvisory.co.uk';
const SENDER_NAME = 'Probity Advisory website';

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Robots-Tag: noindex');

function finish(int $status, array $body): void
{
    http_response_code($status);
    echo json_encode($body);
    exit;
}

/** A trimmed string field from the request, cut to $max characters. */
function field(array $data, string $key, int $max): string
{
    $value = $data[$key] ?? '';
    if (!is_string($value)) {
        return '';
    }
    $value = trim($value);
    return function_exists('mb_substr') ? mb_substr($value, 0, $max) : substr($value, 0, $max);
}

/** The same, folded onto one line: for anything that ends up in a header or a label. */
function line(array $data, string $key, int $max): string
{
    return trim((string) preg_replace('/\s+/u', ' ', field($data, $key, $max)));
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    finish(405, ['ok' => false, 'error' => 'method']);
}

// Browsers send Origin on a cross-site POST; refuse those so other sites cannot drive this script.
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$host = strtolower((string) strtok($_SERVER['HTTP_HOST'] ?? '', ':'));
if ($origin !== '' && strtolower((string) parse_url($origin, PHP_URL_HOST)) !== $host) {
    finish(403, ['ok' => false, 'error' => 'origin']);
}

$data = json_decode((string) file_get_contents('php://input', false, null, 0, 32768), true);
if (!is_array($data)) {
    finish(400, ['ok' => false, 'error' => 'format']);
}

// Honeypot: a field people never see. Anything in it is a bot; tell it "sent" so it moves on.
if (field($data, 'website', 200) !== '') {
    finish(200, ['ok' => true]);
}

$name = line($data, 'name', 120);
$email = line($data, 'email', 254);
if ($name === '' || filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
    finish(422, ['ok' => false, 'error' => 'invalid']);
}

$picked = is_array($data['services'] ?? null) ? array_slice(array_values($data['services']), 0, 10) : [];
$services = [];
foreach (array_keys($picked) as $i) {
    $service = line($picked, (string) $i, 80);
    if ($service !== '') {
        $services[] = $service;
    }
}

$or = function (string $value): string {
    return $value === '' ? '—' : $value;
};

$body = implode("\n", [
    'New enquiry from the website contact form.',
    '',
    'Name:            ' . $name,
    'Firm or company: ' . $or(line($data, 'firm', 160)),
    'Email:           ' . $email,
    'Phone:           ' . $or(line($data, 'phone', 40)),
    'They are:        ' . $or(line($data, 'enquirerType', 80)),
    'What they need:  ' . $or(implode(', ', $services)),
    '',
    'Message:',
    $or(field($data, 'message', 5000)),
    '',
    '—',
    'Reply to this email to answer them directly.',
]);

$subject = '=?UTF-8?B?' . base64_encode('Website enquiry from ' . $name) . '?=';
$headers = implode("\r\n", [
    'From: ' . SENDER_NAME . ' <' . SENDER . '>',
    'Reply-To: ' . $email,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
]);

// -f sets the envelope sender, so bounces come back to us and SPF checks our domain.
if (!mail(RECIPIENT, $subject, $body, $headers, '-f' . SENDER)) {
    finish(500, ['ok' => false, 'error' => 'mail']);
}

finish(200, ['ok' => true]);
