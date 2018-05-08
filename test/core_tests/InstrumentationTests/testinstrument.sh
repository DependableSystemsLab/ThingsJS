#!/bin/bash
# usage: ./testinstrument.sh <file> <reg_output> <inst_output>

file=$1
reg_output=$2
inst_output=$3

# regular file
node ${file} > ${reg_output}

# instrumented file
things-js instrument ${file} -o inst.things.js
(node inst.things.js > ${inst_output})&
pid=$!

# kill and cleanup after x seconds 
sleep 12
kill ${pid}
rm inst.things.js