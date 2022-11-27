const createError = require('http-errors');
const Site = require('../models/site.model.js');

const sites = {
    listSites: (req, res, next) => {
        Site.find()
            .then(sites => res.json(sites))
            .catch(error => next(createError(400, error)));
    },
    findSite: (req, res, next) => {
        const { id } = req.params;
        Site.findById(id)
            .then(site => {
                if (!site) return next(createError(404, 'site not found'));
                res.json(site);
            })
            .catch(error => next(createError(400, error)));
    },
    createSite: (req, res, next) => {
        console.log(req.body);
        const site = new Site(req.body);

        site.save()
            .then(site => res.status(201).json(site))
            .catch(error => next(createError(400, error)));
    },
    updateSite: (req, res, next) => {
        const { id } = req.params;
        Site.findByIdAndUpdate(id, req.body
            , { new: true })
            .then(site => {
                if (!site) return next(createError(404, 'site not found'));
                res.json(site);
            }
            )
            .catch(error => next(createError(400, error)));
    },
    deleteSite: (req, res, next) => {
        const { id } = req.params;
        Site.findByIdAndDelete(id)
            .then(site => {
                if (!site) return next(createError(404, 'site not found'));
                res.json(site);
            })
            .catch(error => next(createError(400, error)));
    }

}

module.exports = sites;
