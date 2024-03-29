FROM node:18-alpine3.15 as app

COPY ./build /build
WORKDIR /usr/src
RUN mv /build/app/* /usr/src && \
    npm install && \
    npm run build


FROM ghcr.io/unb-libraries/nginx:2.x as web
MAINTAINER UNB Libraries <libsupport@unb.ca>

# Add package conf.
COPY --from=app ./build /build
RUN cp -r /build/scripts/container/* /scripts/ && \
  mv /build/nginx/app.conf $NGINX_APP_CONF_FILE && \
  mv /build/app/* $APP_WEBROOT && \
  rm -rf /build

# Container metadata.
LABEL ca.unb.lib.generator="nginx" \
  com.microscaling.docker.dockerfile="/Dockerfile" \
  com.microscaling.license="MIT" \
  org.label-schema.build-date=$BUILD_DATE \
  org.label-schema.description="status.lib.unb.ca is the short URL forwarding application at UNB Libraries." \
  org.label-schema.name="status.lib.unb.ca" \
  org.label-schema.schema-version="1.0" \
  org.label-schema.url="https://status.lib.unb.ca" \
  org.label-schema.vcs-ref=$VCS_REF \
  org.label-schema.vcs-url="https://github.com/unb-libraries/status.lib.unb.ca" \
  org.label-schema.vendor="University of New Brunswick Libraries" \
  org.label-schema.version=$VERSION \
  org.opencontainers.image.source="https://github.com/unb-libraries/status.lib.unb.ca"
