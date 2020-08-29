/**
 * Filter out numbers matching primarity test in second array.
 * @param {array} subject Array of numbers to test
 * @param {array} filters Array of numbers, to count and test for primarity
 * @returns {array} New array, contains all elements from subject 
 *                  (maintaining the order) except those, that are present 
 *                  in filters p times, where p is a prime number.
 */
function filterElements(subject, filters) {
  
  let dictionary = createCountIsPrimeDictionary(filters)
  return subject.filter(num => !dictionary[num])
  
  /**
   * I have chosen simple division algorithm, with O(sqrt(n)) complexity.
   * I know that there are better alternatives, as described below, but this is easy to implement.
   * Please note, we aren't testing arbirtrary numbers for primarity, but count of instances of these numbers.
   * "filters" array would have to be extremely large, for algorithm inefficiencies to show up.
   *
   * Of course, i am aware that You specifically noted importance of time complexity,
   * so I should at least describe other options:
   *
   * Pre-computing primes should be a valid solution. I checked, that serialized JSON object 
   * with primes pre-calculated up to 10 000 000, took about 9.8 MB memory space. 
   * If we can reserve enough memory for it, testing complexity should fall to O(1) for numbers below threshold
   * Of course, final complexity depends heavily on dataset size, because larger numbers still
   * have to be tested, and exactly these are most demanding.
   *
   * In case very large datasets, we should implement different algorithm, like AKS test 
   * (source:wikipedia https://en.wikipedia.org/wiki/AKS_primality_test)
   * it's newest version has complexity O(log(n)^6)
   * but without serious commitment I am not sure I can do it correctly
   */
  function isPrime(num=null) {
    if (num===2) return true
    if (isNaN(num) || num<=1 || num%2===0) return false
    let result = true
    for (let i = 3; i<=Math.sqrt(num); i+=2) {
      if (num%i===0) {
        result = false
        break
      }
    }
    return result;
  }

  /**
   * Creates dictionary for numbers in filters array
   * @param {array} arr Original filters array
   * @returns {object} Keys are numbers, values are result of primarity test of their count
   */
  function createCountIsPrimeDictionary(arr) {
    const dict = {}
    for(let i of arr) {
      if (dict[i]===undefined) {
        dict[i]=1
      } else {
        dict[i]++
      }
    }
    for(let idx in dict) {
      dict[idx]=isPrime(dict[idx])
    }
    return dict;
  }
  
}
