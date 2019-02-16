FROM bitnami/minideb:stretch

# ローカライズ
RUN apt-get update
RUN apt-get -y install locales && \
    localedef -f UTF-8 -i ja_JP ja_JP.UTF-8
ENV LANG ja_JP.UTF-8
ENV LANGUAGE ja_JP:ja
ENV LC_ALL ja_JP.UTF-8
ENV TZ JST-9
# Java, gradleのインストール
RUN apt-get -y install openjdk-8-jdk
RUN apt-get -y install software-properties-common
RUN add-apt-repository ppa:cwchien/gradle -y
RUN apt-get update
RUN apt-get -y --allow-unauthenticated upgrade gradle
RUN apt-get autoremove
# npmのインストール
RUN apt-get -y install gradle
RUN apt-get -y install curl
RUN apt-get -y install gnupg
RUN curl -sL https://deb.nodesource.com/setup_11.x | bash -
RUN apt-get install -y nodejs
RUN apt-get install -y build-essential

WORKDIR /opt/anigiri-web
COPY ./ /opt/anigiri-web

VOLUME /var/log/anigiri/

CMD gradle bootRun
