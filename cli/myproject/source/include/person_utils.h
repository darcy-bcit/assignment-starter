#ifndef PERSON_UTILS_H
#define PERSON_UTILS_H

// Person represents a Person structure
typedef struct Person {
    char* name;
    int age;
    float height;
} Person;

Person* createPerson(const char* name, int age, float height);
void printPerson(const Person* person);

#endif // PERSON_UTILS_H
