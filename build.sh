#!/bin/bash
echo "Start"
hexo clean
hexo generate
gulp
echo "Finish"
echo 按任意键继续
read -n 1