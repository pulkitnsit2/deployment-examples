FROM node:16.18-alpine3.16 AS build

# OS Packages
RUN apk add --update --no-cache dumb-init

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

COPY . .

RUN npm run build

FROM node:16.18-alpine3.16 AS app

LABEL maintainer="Pulkit Gupta <pulkit.gupta@coindcx.com>"

COPY --from=build /usr/bin/dumb-init /usr/bin/dumb-init

# Non-Root user
RUN addgroup -g 7777 dcx &&\
    adduser -D -h /home/dcx dcx -s /bin/false -u 7777 -G dcx

USER dcx
RUN mkdir /home/dcx/app
WORKDIR /home/dcx/app

# setup project structure
COPY --chown=dcx:dcx --from=build /app/dist ./dist
COPY --chown=dcx:dcx . .

# only install production dependencies
RUN npm ci --only=production

# Define env vars
ARG NODE_ENV
ARG DCX_ENV

# Fetch out env vars or set development in case the value of NODE_ENV is not supplied
ENV NODE_ENV=${NODE_ENV:-staging}
ENV DCX_ENV=${DCX_ENV:-staging}

ENTRYPOINT [ "/usr/bin/dumb-init", "--" ]
CMD [ "./deployment/entrypoint.sh" ]