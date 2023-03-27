<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Billing</title>
        <link rel="icon" type="image/png" href="{{ asset('favicon.png') }}">
        @viteReactRefresh
        @vite('resources/js/app.jsx')
    </head>
    <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
       <div id="root"></div>
       <div id="portal"></div>
    </body>
</html>
