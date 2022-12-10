import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { parseResolveInfo, ResolveTree } from 'graphql-parse-resolve-info';
import * as includeObjs from '../prisma-query-types';

//TODO: catch fields that aren't being called and remove them from default includeObj

// fields that exist on models but are not exposed publicly in the SDL and
// need to be mapped in the returned includeObj
const hiddenFields = [];

export const GetIncludeObj = createParamDecorator<object>(
	(includeObj, context: ExecutionContext) => {
		const info = GqlExecutionContext.create(context).getInfo();
		//the below fails when info.returnType is a GraphQLList
		//const { name: parent } = info.returnType as GraphQLObjectType;
		const parentTree = parseResolveInfo(info) as ResolveTree;
		//console.log(JSON.stringify(parentTree));
		if (!Object.keys(parentTree.fieldsByTypeName).length) return {}; //there is no includeObj to get, because the query selected no fields from the result

		// determine if this query is pageable
		// if so, skip the first ResolveTree
		const pageableQueryParent = Object.keys(parentTree.fieldsByTypeName).find((key) =>
			key.toLowerCase().includes('pageable'),
		);
		// console.log(includeObjs[`${parent.toLowerCase()}Include`]);

		const { include } = getObject(
			includeObj,
			!pageableQueryParent ? parentTree : parentTree.fieldsByTypeName[pageableQueryParent].data,
		);
		//console.log(JSON.stringify(include));
		return include;
	},
);

const getObject = function (includeObj: object, parentTree: ResolveTree) {
	//util function
	const lowercaseFirstLetter = (str: string) => str.charAt(0).toLowerCase() + str.slice(1);

	const { fieldsByTypeName } = parentTree;
	//TODO: what if there's more than one parent?
	const [[parentName, parentFields]] = Object.entries(fieldsByTypeName);
	// console.log(`parent: ${parentName}`);
	//console.log('parentFields:', parentFields);
	//if includeObj wasn't resolved, fetch it using the ResolveTree parent
	includeObj ||= includeObjs[`${lowercaseFirstLetter(parentName)}Include`] || {};
	// console.log('includeObj', includeObj);

	const res = Object.entries(includeObj).reduce((acc, [key, val]) => {
		// console.log(`key: ${key}`);
		// console.log('val:', val);
		return {
			...acc,
			...(hiddenFields.includes(key) && { [key]: val }), // manually include hidden fields in result object
			...(key in parentFields && {
				[key]: !Object.keys(parentFields[key].fieldsByTypeName).length
					? val
					: val.hasOwnProperty('include')
					? {
							include: {
								...val.include,
								[Object.keys(val.include)[0]]: getObject(
									includeObjs[`${key}Include`],
									parentFields[key],
								),
							},
					  }
					: getObject(includeObjs[`${key}Include`], parentFields[key]),
			}),
		};
	}, {});

	//console.log(`${parentName} res:`, res);
	return !Object.keys(res).length ? true : { include: res };
};
