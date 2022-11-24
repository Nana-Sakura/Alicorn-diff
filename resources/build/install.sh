#!/bin/sh
echo "Installing LibearXL, just a second..."
USERNAME=`whoami`
DESTFILE="/home/$USERNAME/.local/share/applications/LibearXL.desktop"
rm -f $DESTFILE
cd `dirname $0`
MYDIR=`pwd`
chmod +x "LibearXL"
for LN in '[Desktop Entry]' 'Type=Application' 'Version=1.0' 'Name=LibearXL' 'Comment=A cute custom Minecraft launcher for everypony!' "Path=$MYDIR" "Exec=$MYDIR/LibearXL" "Icon=$MYDIR/LibearXL.png" 'Terminal=false'
do
  echo $LN >> $DESTFILE
done

echo "Installation complete, starting for you..."
./LibearXL