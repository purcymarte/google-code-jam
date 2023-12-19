
expected weight 
= 1
= total probability / total weight

expected weight per room 
= 1/N
= expected weight / no. of rooms

expected weight per visit 
= 1/(N*P)
= expected weight / no. of rooms / no. ways to get to room via walking

weight of a visit after single walk
= P*(1/N)*(1/B) = 1/N


weightNodeB = 1 * options from source A / arrival routes to B
// many options for source A and few arrival routes make it unlikely for the
// node to be visited often. high weight to compensate for this.

// given a network A-B
// and given we have a 80% chance of visiting A
// and 20% chance of visiting B

// if we visit 1000 times
// we expect to visit Node A 800 times and NodeB 200 times
// we end up with 800 samples of node A and 200 samples of node B.
// 