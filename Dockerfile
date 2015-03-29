FROM    codefresh/cf-base:hack-day

# Bundle app source
COPY . /src
# Install app dependencies
RUN cd /src; npm install

EXPOSE  9000
CMD ["node", "/src/bin/www"]
