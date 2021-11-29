FROM ubuntu
RUN apt-get update
RUN apt-get -y install software-properties-common
RUN add-apt-repository --yes ppa:graphics-drivers/ppa
RUN apt-key adv --keyserver keyserver.ubuntu.com --recv-keys FCAE110B1118213C
RUN apt-get update && apt-get -y install nvidia-driver-418