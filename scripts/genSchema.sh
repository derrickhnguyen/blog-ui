#!/usr/bin/env bash

set -euo pipefail

SCRIPTS_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$SCRIPTS_DIR/.."
BLOG_SERVER_DIR="$ROOT_DIR/../blog"

echo "Copying blog server's GraphQL schema and TypeScript types..."

mkdir -p $ROOT_DIR/generated/blog

cp ${BLOG_SERVER_DIR}/generated/nexusTypes.gen.ts $ROOT_DIR/generated/blog/schema.ts

echo "All done!"