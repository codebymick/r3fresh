QUnit.module( "supportedProtocol" );

QUnit.test( "Returns false for unsupported protocol", function( assert ) {
  var tab = { url: "chrome://extensions/" };
  assert.equal( supportedProtocol(tab), false );
});

QUnit.test( "Returns true for supported protocol", function( assert ) {
  var tab = { url: "file:///Users/Admin/Downloads/somepage.html" };
  assert.equal( supportedProtocol(tab), true );

  tab = { url: "https://codebymick.com/" };
  assert.equal( supportedProtocol(tab), true );

  tab = { url: "http://codebymick.com/" };
  assert.equal( supportedProtocol(tab), true );
});
