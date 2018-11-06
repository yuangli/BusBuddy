if [ -d "../client/build/views" ]; then 
	echo "./client/build/views exists, overwriting files..."
	cp ../client/src/views/* ../client/build/views
	cp ../client/src/index.html ../client/build/index.html
	
else 
	echo "./client/build/views doesnt exist, creating directory..."
	mkdir "../client/build/views"
	cp ../client/src/views/* ../client/build/views
	cp ../client/src/index.html ../client/build/index.html
fi

echo "Views copy process finished."
 
if [ -d "../client/build/fonts" ]; then 
	echo "./client/build/fonts exists, overwriting files..."
	cp ../client/src/fonts/* ../client/build/fonts
	
else 
	echo "./client/build/fonts doesnt exist, creating directory..."
	mkdir "../client/build/fonts"
	cp ../client/src/fonts/* ../client/build/fonts
fi

echo "Fonts copy process finished."