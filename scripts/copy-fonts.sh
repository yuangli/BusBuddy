#!/usr/bin/env bash
 
if [ -d "../client/build/fonts" ]; then 
	echo "./client/build/fonts exists, overwriting files..."
	cp ../client/src/fonts/* ../client/build/fonts
	
else 
	echo "./client/build/fonts doesnt exist, creating directory..."
	mkdir "../client/build/fonts"
	cp ../client/src/fonts/* ../client/build/fonts
fi

echo "Fonts copy process finished."