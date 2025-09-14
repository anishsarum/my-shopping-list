#!/bin/sh
# Build all services
(cd frontend && npm install)
(cd backend && npm install && npx prisma generate)