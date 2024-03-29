using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Infrastructure.Data;
using API.Errors;

namespace API.Controllers
{
    
    public class BuggyController : BaseApiController
    {
        public StoreContext _context { get; }
        public BuggyController(StoreContext context)
        {
            _context = context;
            
        }
        
        [HttpGet("notfound")]
        public ActionResult GetNotFoundResult()
        {
            var thing = _context.Products.Find(45);
            if (thing == null)
            {
                return NotFound(new ApiResponse(404));
            }
            return Ok();
        }

        [HttpGet("servererror")]
        public ActionResult GetServerError()
        {
            var thing = _context.Products.Find(45);
            var toreturn =  thing.ToString();
            return Ok();
        }

        [HttpGet("badrequest")]
        public ActionResult GetBadRequest()
        {
            return BadRequest(new ApiResponse(400));
        }

        [HttpGet("badrequest/{id}")]
        public ActionResult GetNotFoundRequest()
        {
            return BadRequest(new ApiResponse(400));
        }
    }
}