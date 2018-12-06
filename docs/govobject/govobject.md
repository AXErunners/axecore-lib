# Governance Object / Proposal

- [GovObject](#governance-object)
    - [`new GovObject([govObjectData])`](#new-govobjectgovobjectdata)
    - [Methods](#methods)
        - [dataHex](#datahex)
        - [fromObject](#fromobject)
        - [fromString](#fromstring)
        - [checkedSerialize](#checkedserialize)
        - [serialize](#serialize)
        - [inspect](#inspect)
        - [toBuffer](#tobuffer)
        - [fromBuffer](#frombuffer)
        - [shallowCopy](#shallowcopy)
- [Governance Object Creation](#governance-object-creation)
- [Governance Object Types](#govobject-types)

## Governance Object

A Governance Object (or "govObject") is a generic structure introduced in Axe Core v12.1 to allow for the creation of Budget Proposals, Triggers, and Watch Dogs. Class inheritance has been utilized to extend this generic object into a "Proposal" which is outlined throughout the remainder of this document. 

### `new GovObject([govObjectData])`

Creates a new `GovObject` object where:
  - `govObjectData` - optional data (allowed types are `json`, `jsonString`, `hex`, `buffer`, `GovObject`)

### Methods

####  `dataHex`  
Returns a dataHex representation (see above)
####  `fromObject`  
Allow to create a govObj from a json or stringifiedJSON obj
####  `fromString`
Allow to create a govObj from a hex string
####  `checkedSerialize`
Return a hex string that can be used in axed CLI
####  `serialize`
Return a hex string
####  `inspect`
Returns a representation of the object
####  `toBuffer`
Return a buffer
####  `fromBuffer`
Allow to create a govObject from a buffer
####  `shallowCopy`
Allow to shallowCopy from another govObject

## Governance Object Creation

The following would create a blank govObject

```javascript
// instantiate a new govObject instance
var govObject = new GovObject();
```

Budget Proposals can be created from a valid JSON object (stringified or not)

```javascript
var jsonProposal = {
  name:  "My First GovObject",
  start_epoch: 1483228800,
  end_epoch: 1483747200,
  payment_address: 'yXGeNPQXYFXhLAN1ZKrAjxzzBnZ2JZNKnh',
  payment_amount: 10,
  type: 1,
  url: "http://www.axe.org/proposal/first_proposal"
};

// Will instantiate the govObject given the json passed as arg for fromObject
govObject = govObject.fromObject(jsonProposal);
var govObject = new GovObject().fromObject(jsonProposal);

// It's worth mentioning that fromObject can also be a valid stringified json.
var govObject = new GovObject().fromObject(JSON.stringify(jsonProposal));
```

Budget Proposals can be instantiated from a Buffer

```javascript
// Allow creation of a new object from a given buffer
var fromBuff = new GovObject(govObjBuffer);
// Or
var fromBuff = new GovObject().fromBuffer(govObjBuffer);

// And from a hex string
var fromString = new GovObject("7b226e616d65223a224...");
// or
var fromString = new GovObject().fromString("7b226e616d65223a224...")
```

You can display a hex-encoded representation of a Budget Proposal with a simple "toString()"

```javascript
var fromString = new GovObject("7b226e616d65223a224...");

var hexString = fromString.toString();
// or
var hexString = fromString.serialize();
```

Logging the object will also return a hex-encoded representation of the object

```javascript
var fromString = new GovObject("7b226e616d65223a224...");

console.log(fromString) // <GovObject: 7b226e616d65223a224...>
// Or using the method
fromString.inspect();
```

You could shallowcopy a first govObj into a second one

```javascript
proposal.url = "http://axe.org/badUrl"
var shallowCopyProposal = proposal.shallowCopy();
proposal.url = "http://axe.org/fixedUrl"

console.log(proposal.url!==shallowCopyProposal.url) // return true as it's a copy
console.log(proposal!==shallowCopyProposal) // return true
```

Finally you are able to get the dataHex from the object

```javascript
var fromString = new GovObject("7b226e616d65223a224...");

// Give a stringified json [['proposal',{name:"My First GovObject",....}]]
fromString.dataHex()

// You could get back the given JSON object by doing so
var JSONObject = JSON.parse(fromString.dataHex());
```

## GovObject Types:

Each of these types are inherited from govObject allowing the same methods to be callable.

* Proposal `type:1`: Allow to create a proposal which inherit govObject method and overwrite them when needed

```javascript
var jsonProposal = {
  name: "My First Proposal",
  start_epoch: startDate,
  end_epoch: endDate,
  payment_address: 'yXGeNPQXYFXhLAN1ZKrAjxzzBnZ2JZNKnh',
  payment_amount: 10,
  type: 1,
  url: "http://www.axe.org"
};

var proposal = new Proposal();
// create a new proposal from a stringified JSON object
proposal = proposal.fromObject(JSON.stringify(jsonProposal));

// As proposal inherits govObject
var shallowCopy = proposal.shallowCopy();

// Return a hex equivalent of the proposal
var hexProposal = proposal.serialize()
```
