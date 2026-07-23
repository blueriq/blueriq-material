# syntax = docker/dockerfile:1.24@sha256:87999aa3d42bdc6bea60565083ee17e86d1f3339802f543c0d03998580f9cb89
FROM docker-internal.blueriq.com/nodejs-build:24.18.0-ubi-9.5-1736404036@sha256:03a02f713b02c218cca891e4d783ccc7988dc456e701f136dc38656c7dd978a0 as node-base

FROM node-base AS packages

WORKDIR /usr/src

# Copy all package.json files in the Docker context into the layer. This uses a bind mount and manual `find` command
# instead of Docker's COPY instruction, as Docker is unable to copy glob patterns into the layer.
RUN --mount=type=bind,target=/docker-context \
    cd /docker-context/; \
    find . -name "package.json" -mindepth 0 -maxdepth 4 -exec cp --parents "{}" /usr/src/ \;

# Copy npmrc, pnpm-lock.yaml and pnpm-workspace.yaml files if they exist into the layer. This uses a bind mount and
# checks if the files exist instead of Docker's COPY instruction. Docker fails if a file does not exist, which should
# be a valid option.
RUN --mount=type=bind,target=/docker-context \
    cd /docker-context/; \
    [ -e pnpm-lock.yaml ] && cp pnpm-lock.yaml /usr/src/ ; \
    [ -e pnpm-workspace.yaml ] && cp pnpm-workspace.yaml /usr/src/ ; \
    exit 0

########################################################################################################################

FROM node-base AS node

WORKDIR /usr/src
COPY --from=packages /usr/src/ .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store,sharing=locked \
    --mount=type=secret,id=npm_username,env=NPM_USERNAME,required=true \
    --mount=type=secret,id=npm_password,env=NPM_PASSWORD,required=true \
    pnpm config set store-dir /pnpm/store && \
    cp package.json package.json.bkp && \
    pnpm install --prefer-offline --frozen-lockfile --ignore-scripts

########################################################################################################################

FROM node AS workspace

RUN --mount=type=bind,target=/docker-context \
    cp -R --no-clobber /docker-context/. /usr/src/

RUN sed -i -e 's/\r//g' ./scripts/build/*.sh
