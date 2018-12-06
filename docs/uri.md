# Axe URIs
Represents a Axe payment URI. Axe URI strings is a good standard to share payment request, sometimes as a Axe link or using a QR code.

URI Examples:

```
axe:XuUGDZHrKLo841CyamDbG5W7n59epA71h2
axe:XuUGDZHrKLo841CyamDbG5W7n59epA71h2?amount=1.2
axe:XuUGDZHrKLo841CyamDbG5W7n59epA71h2?amount=1.2&message=Payment&label=Satoshi&extra=other-param
```

## URI Validation
The main use that we expect you'll have for the `URI` class in Axecore is validating and parsing Axe URIs. A `URI` instance exposes the address as a Axecore `Address` object and the amount in satoshis, if present.

The code for validating URIs looks like this:

```javascript
var uriString = 'axe:XuUGDZHrKLo841CyamDbG5W7n59epA71h2?amount=1.2';
var valid = URI.isValid(uriString);
var uri = new URI(uriString);
console.log(uri.address.network, uri.amount); // 'livenet', 120000000
```

## URI Parameters
All standard parameters can be found as members of the `URI` instance. However a Bitcoin URI may contain other non-standard parameters, all those can be found under the `extra` namespace.

See [the official BIP21 spec](https://github.com/bitcoin/bips/blob/master/bip-0021.mediawiki) for more information.

## Create URI
Another important use case for the `URI` class is creating a Bitcoin URI for sharing a payment request. That can be accomplished by using a dictionary to create an instance of URI.

The code for creating an URI from an Object looks like this:

```javascript
var uri = new URI({
  address: 'XuUGDZHrKLo841CyamDbG5W7n59epA71h2',
  amount : 10000, // in satoshis
  message: 'My payment request'
});
console.log(uri.toString()) //axe:XuUGDZHrKLo841CyamDbG5W7n59epA71h2?amount=0.0001&message=My%20payment%20request
```

Methods `toObject`, `toJSON` and `inspect` remain available.

## fromString

```
var uri = new URI("axe:XuUGDZHrKLo841CyamDbG5W7n59epA71h2?amount=0.0001&message=My%20payment%20request>")
```


## fromObject
```
var uri = new URI({
          address:"XuUGDZHrKLo841CyamDbG5W7n59epA71h2",
          amount:"10000",
          message:"My payment request"
          })
```
