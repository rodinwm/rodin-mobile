#!/bin/bash
cd ios
bundle config set --local path 'vendor/bundle'
bundle install --jobs=4
bundle exec pod install
cd ..