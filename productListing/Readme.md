API End Points are
1 for Pagination
/api/products?page=1&limit=10
2 top N most expensive products:
api/products/top-expensive?n=5
3 top N users who have listed the most products:
api/users/top-sellers?n=3

Database: mongodb Atlas
.env: DBURI: // replace with own db url
