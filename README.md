# Twitter e-Participation Web App

## Goal

The main goal is to provide an information system capable of supporting e-participation campaings via Twitter through tweet categorization.

Categories are fully customizable, but depends on a different training dataset (see [https://github.com/viniciusbo/svm-text-classification-api](https://github.com/viniciusbo/svm-text-classification-api)).

It may also support any kind of Twitter campaings involving tweet categorization.

## Design concepts

- Extract tweets from Twitter Stream based on keywords/hashtags
- Classificate tweet corpus in real time via job queue

## Building and running

1. Start celery job queue (see [https://github.com/viniciusbo/svm-text-classification-api](https://github.com/viniciusbo/svm-text-classification-api))
2. Clone repo, install dependencies and start application
  ```bash
  git clone git@github.com:viniciusbo/eparticipation && cd eparticipation
  npm install
  npm start
  ```

[Now open your browser at http://localhost:8789](http://localhost:8789).

## License

ISC