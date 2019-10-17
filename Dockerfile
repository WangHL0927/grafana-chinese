FROM grafana/grafana:6.4.3

USER root
RUN rm -rf /usr/share/grafana/public/build && \
    rm -rf /usr/share/grafana/public/views
COPY ./grafana/public/build /usr/share/grafana/public/build
COPY ./grafana/public/views /usr/share/grafana/public/views
USER grafana
