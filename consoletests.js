const tsvData = `const tsvData = prop2	nest.prop1	array.prop1
123	testnest	testarray1`
const rows = tsvData.split('\n').map(row => row.split('\t'));
console.log(rows)