import { version } from '../../package.json';
import { Router } from 'express';
import facets from './facets';
import FilterProcessor from './filters/FilterProcessor';

export default ({ config, db }) => {
	let api = Router();

	// mount the facets resource
	api.use('/facets', facets({ config, db }));

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	api.post('/apply_filter', (req, res) =>  {

		// console.log(req.body);

		const data = req.body.data;
		const type = req.body.type;

		const processor = new FilterProcessor(data, type);

		return res.json({type: type, data: processor.process()});
	});

	return api;
}
