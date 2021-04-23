#!/bin/bash 
###
 # @Author: your name
 # @Date: 2021-04-09 10:46:50
 # @LastEditTime: 2021-04-15 16:19:49
 # @LastEditors: Please set LastEditors
 # @Description: In User Settings Edit
 # @FilePath: /fmg-forestage-master/Phoenix-management/deploy/deploy.sh
### 

cd ..
npm run build

mv ./dist ./deploy/dist
docker build -t registry.cn-hangzhou.aliyuncs.com/ivannnj/fmg-guild:v1 ./deploy
docker push registry.cn-hangzhou.aliyuncs.com/ivannnj/fmg-guild:v1
rm -r ./deploy/dist

