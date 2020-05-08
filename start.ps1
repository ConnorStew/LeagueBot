Start-Process -WindowStyle hidden -FilePath node -ArgumentList lmaobot.js

Write-Host -NoNewLine 'Press any key to continue...';
$null = $Host.UI.RawUI.ReadKey('NoEcho,IncludeKeyDown');