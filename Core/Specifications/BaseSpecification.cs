using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Core.Specifications
{
    public class BaseSpecification<T> : ISpecifications<T>
    {
        public Expression<Func<T, bool>> Criteria { get; }

        public Expression<Func<T, object>> OrderBy {get; private set;}
        public Expression<Func<T, object>> OrderByDescending {get; private set;}

        public List<Expression<Func<T, object>>> Includes { get; } = new List<Expression<Func<T, object>>>();

        public int Take {get; private set;}
        public int Skip {get; private set;}

        public bool IsPagingEnabled {get; private set;}

        public BaseSpecification()
        {
        }
        public BaseSpecification(Expression<Func<T, bool>> criteria)
        {
            Criteria = criteria;
        }



        protected void AddInclude(Expression<Func<T, Object>> includeExpression)
        {
            Includes.Add(includeExpression);
        }

        protected void AddOrderby(Expression<Func<T, Object>> orderByExpression){
            OrderBy = orderByExpression;
        }

        protected void AddOrderbyDescending(Expression<Func<T, Object>> orderByDescExpression){
            OrderByDescending = orderByDescExpression;
        }

        protected void ApplyPaging(int skip, int take)
        {
            Skip= skip;
            Take = take;
            IsPagingEnabled = true;
        }
    }
}