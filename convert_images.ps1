# PowerShell script to convert all photos to WebP and update HTML references

# Prerequisite: ImageMagick installed and 'magick' available in PATH.
# Run this script from the root of the portfolio_photo folder.

# 1. Convert all JPG/JPEG/PNG files under photos/ to WebP
Get-ChildItem -Path .\photos -Recurse -Include *.jpg,*.jpeg,*.png | ForEach-Object {
    $src = $_.FullName
    $dest = Join-Path $_.DirectoryName ($_.BaseName + ".webp")
    Write-Host "Converting $src -> $dest"
    magick convert "$src" -quality 80 "$dest"    # adjust quality as needed
}

# 2. Optionally remove the original files after verifying the WebP versions
# Uncomment the following lines if you want to delete originals automatically:
Get-ChildItem -Path .\photos -Recurse -Include *.jpg,*.jpeg,*.png | Remove-Item -WhatIf

# 3. Update HTML pages to point at .webp assets instead of original extensions
Get-ChildItem -Path . -Recurse -Filter *.html | ForEach-Object {
    $file = $_.FullName
    Write-Host "Updating references in $file"
    (Get-Content $file) -replace '\.(jpg|jpeg|png)\"', '.webp"' | Set-Content $file
}

Write-Host "Conversion and reference update complete. Verify pages before publishing!"