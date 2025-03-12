<<<<<<< HEAD
FROM ubuntu
RUN apt-get update
RUN apt-get -y install software-properties-common
RUN add-apt-repository --yes ppa:graphics-drivers/ppa
RUN apt-key adv --keyserver keyserver.ubuntu.com --recv-keys FCAE110B1118213C
=======
FROM ubuntu
RUN apt-get update
RUN apt-get -y install software-properties-common
RUN add-apt-repository --yes ppa:graphics-drivers/ppa
RUN apt-key adv --keyserver keyserver.ubuntu.com --recv-keys FCAE110B1118213C
>>>>>>> 2ab508c2deb9bc5dae042dcc7feddd26bff6ed5c
RUN apt-get update && apt-get -y install nvidia-driver-418