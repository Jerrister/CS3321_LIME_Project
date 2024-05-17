# Cypher

## Basic Knowledge about Cypher Type

在 `()` 和 `[]` 中表示点、边的类型时，`:` 前是变量名，后是类型名

比如 `(n : Tag)` 和 `(t : Tag)` 的意义是一样的，只是在后续的指代中分别是 `n` 或 `t`。 这类似于cpp中声明 `Tag n` 和 `Tag t` 的区别。

## Nodes

```
(node_name : node_type {property_name: property_value})

(p : Paper {title : str, year : int, journal : str})
(n : Note {name : str})
(a : author {name : str})
(t : Tag {tag_name : str})
(bt: BigTag {tag_name : str})
```

## Links
```
-[link_name : link_type {property_name: property_value}]->
(n : Note)-[r : NOTE]->(p : Paper)
(p : Paper)-[r : WRITTEN_BY]->(a : Author)
(n : Note)-[r : BELONGS_TO]->(t : Tag)
(p : Paper)-[r : BELONGS_TO]->(t : Tag)
(t1 : Tag)-[r : IN]->(t2: Tag)              # t1是小tag, t2是大tag
```

## Constraints

```
CREATE CONSTRAINT FOR (p:Paper) REQUIRE p.title IS UNIQUE
CREATE CONSTRAINT FOR (n:Note) REQUIRE n.name IS UNIQUE
CREATE CONSTRAINT FOR (t:Tag) REQUIRE t.tag_name IS UNIQUE
```

