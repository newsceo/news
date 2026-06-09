<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ page.title }} | {{ site.title }}</title>
    <!-- Link ke style.css yang sudah Anda buat sebelumnya -->
    <link rel="stylesheet" href="{{ '/style.css' | relative_url }}">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
</head>
<body>
    {{ content }}
</body>
</html>
