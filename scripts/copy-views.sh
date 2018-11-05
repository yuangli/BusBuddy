 #!/usr/bin/env bash
 
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
sleep 10s
