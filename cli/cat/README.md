$> ./myCat file1
    file1Content

$> ./myCat file1 file2
    file1Content
    file2Content

$> ./myCat file1 file1 file1
    file1Content
    file1Content
    file1Content

$> ./myCat directory1
    error: myCat: directory1: Is a directory

$> ./myCat
    error: you must pass at least one file as parameter