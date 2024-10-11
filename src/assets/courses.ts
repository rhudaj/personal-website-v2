export interface Course {
  code: string,
  title: string,
  descr: string,
  tech?: string
}

export const courses: Course[] = [
  {
    "code": "CS 451",
    "title": "Data-Intensive Distributed Computing",
    "descr": "Introduces students to infrastructure for data-intensive computing, with a focus on abstractions, frameworks, and algorithms that allow developers to distribute computations across many machines.  Topics include core concepts (partitioning, replication, locality, consistency), computational models (MapReduce, dataflows, stream processing, bulk-synchronous parallel), and applications.",
    "tech": "Languages: Java, Scala, Frameworks: Hadoop, Apache Spark"
  },
  {
    "code": "CS 480",
    "title": "Introduction to Machine Learning",
    "descr": "Introduction to modeling and algorithmic techniques for machines to learn concepts from data. Generalization: underfitting, overfitting, cross-validation. Tasks: classification, regression, clustering. Optimization-based learning: loss minimization. regularization. Statistical learning: maximum likelihood, Bayesian learning. Algorithms: nearest neighbour, (generalized) linear regression, mixtures of Gaussians, Gaussian processes, kernel methods, support vector machines, deep learning, sequence learning, ensemble techniques. Large scale learning: distributed learning and stream learning. Applications: Natural language processing, computer vision, data mining, human computer interaction, information retrieval.",
    "tech": "Languages: Python - Libraries: Pandas, Numpy, MatplotLib Scikit-learn"
  },
  {
    "code": "CS 486",
    "title": "Introduction to Artificial Intelligence",
    "descr": "Goals and methods of artificial intelligence. Methods of general problem solving. Knowledge representation and reasoning. Planning. Reasoning about uncertainty. Machine learning. Multi-agent systems. Natural language processing."
  },
  {
    "code": "CS 456",
    "title": "Computer Networks",
    "descr": "An introduction to network architectures and protocols, placing emphasis on protocols used in the Internet. Specific topics include application layer protocols, network programming, transport protocols, routing, multicast, data link layer issues, multimedia networking, network security, and network management."
  },
  {
    "code": "CS 348",
    "title": "Database Management",
    "descr": "The main objective of this course is to introduce students to fundamentals of database technology by studying databases from three viewpoints: those of the database user, the database designer, and the database administrator. It teaches the use of a database management system (DBMS) by treating it as a black box, focusing only on its functionality and its interfaces. Topics include introduction to database systems, relational database systems, database design methodology, SQL and interfaces, database application development, concept of transactions, ODBC, JDBC, database tuning, database administration, and current topics (distributed databases, data warehouses, data mining).",
    "tech": "Languages: SQL - Frameworks: MySQL"
  },
  {
    "code": "CS 349",
    "title": "User Interfaces",
    "descr": "An introduction to contemporary user interface implementation concepts, including event abstraction, graphical components, layout, feedback, testing, accessibility, and architectures to develop user interfaces. One or more types of interface toolkit paradigms are considered.",
    "tech": "Languages: JavaScript, TypeScript, HTML, CSS. Frameworks: React, Redux"
  },
  {
    "code": "CS 240",
    "title": "Data Structures and Data Management",
    "descr": "Introduction to widely used and effective methods of data organization, focusing on data structures, their algorithms, and the performance of these algorithms. Specific topics include priority queues, sorting, dictionaries, data structures for text processing."
  },
  {
    "code": "CS 241",
    "title": "Foundations of Sequential Programs",
    "descr": "The relationship between high-level languages and the computer architecture that underlies their implementation, including basic machine architecture, assemblers, specification and translation of programming languages, linkers and loaders, block-structured languages, parameter passing mechanisms, and comparison of programming languages."
  },
  {
    "code": "CS 245",
    "title": "Logic and Computation",
    "descr": "Logic as a tool for representation, reasoning, and computation. Propositional and predicate logic. Formalizing the notions of correct and incorrect reasoning, defining what is computable, and exploring the limits of computation. Godel's Incompleteness Theorem. Applications of logic to computer science."
  },
  {
    "code": "CS 246",
    "title": "Object-Oriented Software Development",
    "descr": "Introduction to object-oriented programming and to tools and techniques for software development. Designing, coding, debugging, testing, and documenting medium-sized programs: reading specifications and designing software to implement them; selecting appropriate data structures and control structures; writing reusable code; reusing existing code; basic performance issues; debuggers; test suites.",
    "tech": "Languages: C++"
  },
  {
    "code": "CS 251",
    "title": "Computer Organization and Design",
    "descr": "Overview of computer organization and performance. Basics of digital logic design. Combinational and sequential elements. Data representation and manipulation. Basics of processor design. Pipelining. Memory hierarchies. Multiprocessors."
  },
  {
    "code": "CS 341",
    "title": "Algorithms",
    "descr": "The study of efficient algorithms and effective algorithm design techniques. Program design with emphasis on pragmatic and mathematical aspects of program efficiency. Topics include divide and conquer algorithms, recurrences, greedy algorithms, dynamic programming, graph search and backtrack, problems without algorithms, NP-completeness and its implications."
  },
  {
    "code": "CS 350",
    "title": "Operating Systems",
    "descr": "An introduction to the fundamentals of operating system function, design, and implementation. Topics include concurrency, synchronization, processes, threads, scheduling, memory management, file systems, device management, and security.",
    "tech": "Languages: C"
  },
  {
    "code": "CS 489",
    "title": "Computational Audio",
    "descr": "This is an 'Advanced Topics' course, offered at both the undergraduate and graduate level. The course will provide a self contained introduction to sound processing by computer. The course will have a strong practical focus.  Students will be encouraged to explore various hardware and software platforms for audio.",
    "tech": "Languages: Python - Libraries: Numpy, Scipy, Matplotlib, PyAudio"
  }
]