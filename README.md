[![npm version](https://badge.fury.io/js/patent_client.svg)](https://badge.fury.io/js/patent_client)

Overview
========

A set of accessors to publicly available intellectual property data, inspired by the [Django ORM API][ORM]

This is a port (IN PROGRESS) of the [Python patent_client package][pypatent] to ES6 Javascript. The main difference is that each request returns a native ES5 Promise, rather than a result.

Currently supports:

* [United States Patent & Trademark Office][USPTO]

  * [Patent Trial & Appeal Board API][PTAB]  - Full Support
  * [Patent Examination Data][PEDS] - Full Support
  * [Patent Assignment Data][Assignment] - Advanced Search Support
  
* [United States International Trade Commission][ITC]

  * [Electronic Document Information System (EDIS) API][EDIS] - No Support

* [European Patent Office - Open Patent Services][OPS]

  * Inpadoc - No Support
  * EPO Register - No Support
  * Classification - No Support

[pypatent]: https://github.com/parkerhancock/patent_client
[ORM]: https://docs.djangoproject.com/en/2.1/
[OPS]: http://ops.epo.org
[USPTO]: http://developer.uspto.gov
[PEDS]: https://developer.uspto.gov/api-catalog/ped
[Assignment]: https://developer.uspto.gov/api-catalog/patent-assignment-search-beta
[PTAB]: https://developer.uspto.gov/api-catalog/ptab-api
[ITC]: https://www.usitc.gov/
[EDIS]: https://edis.usitc.gov/external/

* Free software: Apache Software License 2.0

Installation
============

```bash
    npm install patent_client
```


Documentation
=============

IN PROGRESS

QUICK START
-----------------

To use the project:

```javascript
    const patent_client = require("patent_client")
    
    // Fetch a PTAB trial
    const PtabTrial = patent_client.PtabTrial
    PtabTrial.objects.get("IPR2016-00831").then(trial => {/* do something */});

    // Fetch a PTAB trial's documents
    PtabTrial.objects.get("IPR2016-00831").then(trial => {
        let docs = trial.documents
        /* do something with the documents */
    })
    // OR
    const PtabDocument = patent_client.PtabDocument
    let doc_iterator = PtabDocument.objects.filter("IPR2016-00831") // Returns an async iterable of documents

    //Same as above, but with async/await
    async function get_trial(trial_number) {
        return await PtabTrial.objects.get("IPR2016-00831")
    }

    async function get_docs_from_trial(trial_number) {
        let trial = await PtabTrial.objects.get("IPR2016-00831")
        return trial.documents
    }

```
Development
===========

To run the all tests run:

```bash
npm test
```

Pull requests welcome!

Related projects
================

* [Python Patent Client](https://github.com/parkerhancock/patent_client)
* [Python EPO OPS Client](https://github.com/55minutes/python-epo-ops-client)
* [Google Public Patent Data](https://github.com/google/patents-public-data>)
