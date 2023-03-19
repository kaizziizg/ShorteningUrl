$root=$PWD.Path
$build=$root+"\reactjs\build"
$public=$root+"\public"
echo $build $public
xcopy $build $public /e/h/Y