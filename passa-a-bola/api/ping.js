export default function handler(req, res) {
  res.setHeader('content-type', 'application/json; charset=utf-8');
  res.status(200).end('{"ok":true}');
}
