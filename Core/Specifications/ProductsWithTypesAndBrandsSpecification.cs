using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Specifications
{
    public class ProductsWithTypesAndBrandsSpecification : BaseSpecification<Product>
    {
        public ProductsWithTypesAndBrandsSpecification(ProductSpecParams productParams)
        :
        base(x => 
        (
            (string.IsNullOrEmpty(productParams.Search) || x.Name.ToLower().Contains(productParams.Search)) &&
            (!productParams.BrandId.HasValue || x.ProductBrandId == productParams.BrandId) &&
            (!productParams.TypeId.HasValue || x.ProductTypeId == productParams.TypeId)
        )
        )
        {
            AddInclude(x => x.ProductType);
            AddInclude(X => X.ProductBrand);
            AddOrderby(x => x.Name);
            ApplyPaging(productParams.PageSize * (productParams.PageIndex - 1), productParams.PageSize);

            if(!string.IsNullOrEmpty(productParams.Sort)){
                switch (productParams.Sort){
                    case "priceAsc":
                    AddOrderby(p => p.Price);
                    break;
                    case "priceDesc":
                    AddOrderbyDescending(p => p.Price);
                    break;
                    default: 
                    AddOrderby(n => n.Name);
                    break;

                }
            }
        }

        public ProductsWithTypesAndBrandsSpecification(int id) : base(x => x.Id == id)
        {
            AddInclude(x => x.ProductType);
            AddInclude(X => X.ProductBrand);
        }
    }
}