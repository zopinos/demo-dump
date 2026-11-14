#!/bin/bash

SOURCE_DIR="public/photos/"
TARGET_DIR="public/thumbnails/"

create_thumbnails() {
    for file in "$SOURCE_DIR"/*.jpg "$SOURCE_DIR"/*.JPG; do
        [ -f "$file" ] || continue

        filename=$(basename "$file")

        echo "Processing $filename..."

        magick "$file" \
            -resize '480x480>' \
            -quality 80 \
            -strip \
            "$TARGET_DIR/$filename"
    done

    echo "Thumbnail generation complete!"
}

create_thumbnails 