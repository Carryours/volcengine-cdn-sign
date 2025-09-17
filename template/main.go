package main

import (
	"crypto/md5"
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	"math/rand"
	"regexp"
	"strconv"
	"time"
)

func splitUrl(url string) []string {
	reg := regexp.MustCompile(`^(http://|https://)?([^/?]+)(/[^?]*)?(\?.*)?$`)
	return reg.FindStringSubmatch(url)
}

func hash(algorithm string, text string) string {
	var hashByte []byte
	switch algorithm {
	case "md5":
		v := md5.Sum([]byte(text))
		hashByte = v[:]
	case "sha256":
		h := sha256.New()
		_, _ = h.Write([]byte(text))
		hashByte = h.Sum(nil)
	}

	return hex.EncodeToString(hashByte)
}

func getRandomString(length int) string {
	b := make([]byte, length)
	rand.Read(b)
	return fmt.Sprintf("%x", b)[:length]
}

func GenTypeAUrl(url string, key string, signName string, uid string, ts int64, algorithm string) string {
	params := splitUrl(url)
	scheme, host, path, args := params[1], params[2], params[3], params[4]
	randstr := getRandomString(10)
	text := fmt.Sprintf("%s-%d-%s-%s-%s", path, ts, randstr, uid, key)
	hash := hash(algorithm, text)
	authArg := fmt.Sprintf("%s=%d-%s-%s-%s", signName, ts, randstr, uid, hash)
	if args == "" {
		return fmt.Sprintf("%s%s%s?%s", scheme, host, path, authArg)
	} else {
		return fmt.Sprintf("%s%s%s%s&%s", scheme, host, path, args, authArg)
	}
}

func GenTypeBUrl(url string, key string, ts int64, algorithm string) string {
	params := splitUrl(url)
	scheme, host, path, args := params[1], params[2], params[3], params[4]
	tsStr := time.Unix(ts, 0).Format("200601021504")
	text := fmt.Sprintf("%s%s%s", key, tsStr, path)
	hash := hash(algorithm, text)
	return fmt.Sprintf("%s%s/%s/%s%s%s", scheme, host, tsStr, hash, path, args)
}

func GenTypeCUrl(url string, key string, ts int64, algorithm string) string {
	params := splitUrl(url)
	scheme, host, path, args := params[1], params[2], params[3], params[4]
	tsStr := strconv.FormatInt(ts, 16)
	text := fmt.Sprintf("%s%s%s", key, path, tsStr)
	hash := hash(algorithm, text)
	return fmt.Sprintf("%s%s/%s/%s%s%s", scheme, host, hash, tsStr, path, args)
}

func GenTypeDUrl(url, key, signName, timeName string, ts int64, base int, algorithm string) string {
	params := splitUrl(url)
	scheme, host, path, args := params[1], params[2], params[3], params[4]
	tsStr := strconv.FormatInt(ts, base)
	text := fmt.Sprintf("%s%s%s", key, path, tsStr)
	hash := hash(algorithm, text)
	authArg := fmt.Sprintf("%s=%s&%s=%s", signName, hash, timeName, tsStr)
	if args == "" {
		return fmt.Sprintf("%s%s%s?%s", scheme, host, path, authArg)
	} else {
		return fmt.Sprintf("%s%s%s%s&%s", scheme, host, path, args, authArg)
	}
}

// GenTypeEUrl Genrate signed url by custom rule(eg.：key+domain+uri+timestamp)
func GenTypeEUrl(url, key, signName, tsName string, ts int64, base int, algorithm string) string {
	params := splitUrl(url)
	scheme, domain, uri, args := params[1], params[2], params[3], params[4]
	tsStr := strconv.FormatInt(ts, base)
	text := fmt.Sprintf("%s%s%s%s", key, domain, uri, tsStr)
	hash := hash(algorithm, text)
	authArg := fmt.Sprintf("%s=%s&%s=%s", signName, hash, tsName, tsStr)
	if args == "" {
		return fmt.Sprintf("%s%s%s?%s", scheme, domain, uri, authArg)
	} else {
		return fmt.Sprintf("%s%s%s%s&%s", scheme, domain, uri, args, authArg)
	}
}

func init() {
	rand.Seed(time.Now().UnixNano())
}

func main() {
	url := "https://image-cdn-test.tuchong.com/weili/sm/2353676296380219401.webp"
	primaryKey := "tuchong123"
	// signName := "sign"
	// timeName := "t"
	// uid := "0"
	ts := time.Now().Unix() + 10 // Assume the requests expire in 1 hour.
	// var ts int64 = 1742289420

	fmt.Println("OriginUrl: ", url)
	for _, algorithm := range []string{"md5", "sha256"} {
		// typeAUrl := GenTypeAUrl(url, primaryKey, signName, uid, ts, algorithm)
		// typeBUrl := GenTypeBUrl(url, primaryKey, ts, algorithm)
		typeCUrl := GenTypeCUrl(url, primaryKey, ts, algorithm)
		// typeDUrl := GenTypeDUrl(url, primaryKey, signName, timeName, ts, 10, algorithm)
		// typeEUrl := GenTypeEUrl(url, primaryKey, signName, timeName, ts, 10, algorithm)

		// fmt.Printf("TypeA + %s: %s\n", algorithm, typeAUrl)
		// fmt.Printf("TypeB + %s: %s\n", algorithm, typeBUrl)
		fmt.Printf("TypeC + %s: %s\n", algorithm, typeCUrl)
		// fmt.Printf("TypeD + %s: %s\n", algorithm, typeDUrl)
		// fmt.Printf("TypeE + %s: %s\n", algorithm, typeEUrl)
	}
}
