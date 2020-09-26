const expect = require("chai").expect;

const authMiddleware = require("../middleware/is-auth"); 

describe("Auth Middleware", function() {
    
    it("should throw a error if no authorization header is present", function() {
        const req = {
            get: function(headerName) {
                return null;
            }
        };
        expect(authMiddleware.bind(this, req, {}, () => {})).to.throw("Not Authenticated!");
    });
    
    it("should throw an error if the authorization header is not the only one string", function() {
        const req = {
            get: function(headerName) {
                return "xyz";
            }
        };
    
        expect(authMiddleware.bind(this, req, () => {})).to.throw();
    });
})

