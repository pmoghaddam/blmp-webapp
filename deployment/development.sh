# Install everything
npm install
bower install

# Test and Build
grunt

# Deploy
cd server
git pull
cd ..

# Commit Heroku entry
rm -rf server/dist
cp -R dist server/dist
cd server

# Push to Heroku
git add -A
git commit -m "Another build"
git push origin master --force