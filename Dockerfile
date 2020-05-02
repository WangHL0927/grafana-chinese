FROM grafana/grafana:6.7.3

USER root
RUN rm -rf /usr/share/grafana/public
COPY ./grafana/public /usr/share/grafana/public
USER grafana
