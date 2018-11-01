 #!/usr/bin/env bash
if [ -d "build/views" ]; then 
	echo "build/views exists, overwriting files..."
	cp src/views/* build/views

else 
	echo "build/views doesnt exist, creating directory..."
	mkdir './build/views'
	cp src/views/* build/views
fi

echo "Views copy process finished."