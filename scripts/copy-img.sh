#!/usr/bin/env bash
 
if [ -d "../client/build/img" ]; then 
	echo "./client/build/img exists, overwriting files..."
	cp ../client/src/img/* ../client/build/img
	
else 
	echo "./client/build/img doesnt exist, creating directory..."
	mkdir "../client/build/img"
	cp ../client/src/img/* ../client/build/img
fi

echo "Img copy process finished."